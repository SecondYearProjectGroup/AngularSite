import { Component, Input } from '@angular/core';
import { EmailServiceService } from '../../services/email-service.service';
import { EmailTemplate } from '../../../models/email-template';
import { UserRoleService } from '../../services/user-role.service';


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

  constructor(private emailService: EmailServiceService,
    private userRoleService: UserRoleService
  ) {}

  @Input() mode: 'editTemplate' | 'addNewTemplate' | 'sendEmail' | 'sendEmailToStudent' = 'sendEmail';
  @Input() emailHeading: boolean = true;
  @Input() regNo: string | null = null;

  userRole: string | null = null;
  activeTab: string = 'tab1';
  emails: string = '';

  ngOnInit(): void {
    this.loadTemplates();
    scrollTo(0,0);

    this.userRoleService.userRole$.subscribe(role => {
      this.userRole = role;
    });

    this.varSendEmail = true;
    console.log("Reg no in Emails page ", this.regNo);
  }

  // if (this.emails) {
  //   const emailList = this.emails.split(',').map(email => email.trim());
  //   console.log('Submitted emails:', emailList);
  // }

  // Tabs
  selectTab(tab: string) {
    this.activeTab = tab;
    if(tab === 'tab1'){
      this.sendEmail();
    }
    else if (tab === 'tab2'){
      this.addNewTemplate();
    }
    else{
      this.editTemplate();
    }
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

  varSendEmail: boolean = true;
  varAddNewTemplate: boolean = false;
  varEditTemplate: boolean = false;
  sendEmail(){
    this.varSendEmail = true;
    this.varAddNewTemplate = false;
    this.varEditTemplate = false;
  }
  addNewTemplate(){
    this.varAddNewTemplate = true;
    this.varEditTemplate = false;
    this.varSendEmail = false;
  }
  editTemplate(){
    this.varEditTemplate = true;
    this.varAddNewTemplate = false;
    this.varSendEmail = false;
  }

  onNewTemplateSubmit(): void {
      this.selectedTemplate.body = this.editorContent;
        this.emailService.addNewTemplate(this.selectedTemplate).subscribe(
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


  //To be completed
  sendEmailtoStudent(): void {
    this.selectedTemplate.body = this.editorContent;
      this.emailService.sendEmailsFromStudentProfile(this.selectedTemplate).subscribe(
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

