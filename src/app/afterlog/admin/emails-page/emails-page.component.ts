import { Component } from '@angular/core';
import { EmailServiceService } from '../../services/email-service.service';
import { EmailTemplate } from '../../../models/email-template';

@Component({
  selector: 'app-emails-page',
  templateUrl: './emails-page.component.html',
  styleUrls: ['./emails-page.component.css']
})
export class EmailsPageComponent {
  templates: EmailTemplate[] = [];
  selectedTemplateId: number | null = null;
  selectedTemplate: EmailTemplate = { id: 0, name: '', subject: '', body: '' };
  editorContent: string = '';  // This will hold the editor content

  constructor(private emailService: EmailServiceService) {}

  ngOnInit(): void {
    this.loadTemplates();
  }

  loadTemplates(): void {
    this.emailService.getAllTemplates().subscribe(
      (data) => {
        this.templates = data;
      },
      (error) => {
        console.error('Error fetching email templates', error);
      }
    );
  }

  onTemplateChange(event: any): void {
    const selectedId = event.target.value;
    const selectedTemplate = this.templates.find(template => template.id === +selectedId);
    
    if (selectedTemplate) {
        // Load subject and content fields with the template data
        this.selectedTemplate = selectedTemplate; // Set selectedTemplate to the selected one
        this.editorContent = selectedTemplate.body; // Set editor content to the template body
        console.log('Selected Template:', this.selectedTemplate); // Debugging line
    } else {
        // Clear the fields if no template is selected
        this.selectedTemplate = { id: 0, name: '', subject: '', body: '' };
        this.editorContent = '';
    }
}


  onTemplateSubmit(): void {
    if (this.selectedTemplateId !== null) {
      this.selectedTemplate.body = this.editorContent;
        this.emailService.updateTemplate(this.selectedTemplateId, this.selectedTemplate).subscribe(
            (response) => {
                console.log('Template updated successfully:', response);
                // Optionally, reload templates to reflect changes
                this.loadTemplates(); 
            },
            (error) => {
                console.error('Error updating email template:', error);
            }
        );
    }
}

}

