import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { Editor, NgxEditorModule } from 'ngx-editor';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  standalone: true,
  imports: [PagetitleComponent,NgxEditorModule],
  schemas: [NO_ERRORS_SCHEMA]
})

/**
 * Form-editor component
 */
export class EditorComponent implements OnInit {

  editor: Editor;
  html = '<p>Content of the editor.</p>';

  // bread crumb items
  breadCrumbItems: Array<{}>;


  constructor() { }

  ngOnInit() {
    this.editor = new Editor();
    this.breadCrumbItems = [{ label: 'Forms' }, { label: 'Form Editor', active: true }];
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
