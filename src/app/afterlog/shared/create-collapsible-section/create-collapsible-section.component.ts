import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create-collapsible-section',
  templateUrl: './create-collapsible-section.component.html',
  styleUrl: './create-collapsible-section.component.css'
})
export class CreateCollapsibleSectionComponent {

  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<{ buttonName: string, tiles: { title: string, link: string }[] }>();

  buttonName = '';
  tiles: { title: string, link: string }[] = [{ title: '', link: '' }];

  addTile(): void {
    this.tiles.push({ title: '', link: '' });
  }

  removeTile(index: number): void {
    this.tiles.splice(index, 1);
  }

  submit(): void {
    this.create.emit({ buttonName: this.buttonName, tiles: this.tiles });
  }

  closeModal(): void {
    this.close.emit();
  }
}
