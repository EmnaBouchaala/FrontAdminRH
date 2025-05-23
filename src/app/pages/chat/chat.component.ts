import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';

import { Store } from '@ngrx/store';
import { fetchchatMessageData, fetchchatdata } from 'src/app/store/Chat/chat.action';
import { selectData, selectchatData } from 'src/app/store/Chat/chat-selector';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SimplebarAngularModule } from 'simplebar-angular';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone:true,
  imports:[PagetitleComponent,CommonModule,TabsModule,SimplebarAngularModule,ReactiveFormsModule]
})
export class ChatComponent implements OnInit, AfterViewInit {

  @ViewChild('scrollEle') scrollEle;
  @ViewChild('scrollRef') scrollRef;

  username = 'Steven Franklin';

  // bread crumb items
  breadCrumbItems: Array<{}>;
  chatData: any
  chatMessagesData: any
  formData: UntypedFormGroup;
  // Form submit
  chatSubmit: boolean;
  usermessage: string;
  emoji: any = '';

  constructor(public formBuilder: UntypedFormBuilder, public store: Store) {
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Skote' }, { label: 'Chat', active: true }];

    this.formData = this.formBuilder.group({
      message: ['', [Validators.required]],
    });

    /**
    * fetches data
    */
    this.store.dispatch(fetchchatdata());
    this.store.select(selectData).subscribe(data => {
      this.chatData = data;
    })
    this.store.dispatch(fetchchatMessageData());
    this.store.select(selectchatData).subscribe(data => {
      this.chatMessagesData = data;
    })
  }

  ngAfterViewInit() {
    this.scrollEle.SimpleBar.getScrollElement().scrollTop = 100;
    this.scrollRef.SimpleBar.getScrollElement().scrollTop = 200;
  }

  /**
   * Returns form
   */
  get form() {
    return this.formData.controls;
  }


  onListScroll() {
    if (this.scrollRef !== undefined) {
      setTimeout(() => {
        this.scrollRef.SimpleBar.getScrollElement().scrollTop =
          this.scrollRef.SimpleBar.getScrollElement().scrollHeight + 1500;
      }, 500);
    }
  }

  chatUsername(name) {
    this.username = name;
    this.usermessage = 'Hello';
    this.chatMessagesData = [];
    const currentDate = new Date();

    this.chatMessagesData.push({
      name: this.username,
      message: this.usermessage,
      time: currentDate.getHours() + ':' + currentDate.getMinutes()
    });

  }

  /**
   * Save the message in chat
   */
  messageSave() {
    const message = this.formData.get('message').value;
    const currentDate = new Date();
    if (this.formData.valid && message) {
      // Message Push in Chat
      this.chatMessagesData.push({
        align: 'right',
        name: 'Henry Wells',
        message,
        time: currentDate.getHours() + ':' + currentDate.getMinutes()
      });
      this.onListScroll();

      // Set Form Data Reset
      this.formData = this.formBuilder.group({
        message: null
      });
    }

    this.chatSubmit = true;
  }

  // Delete Message
  deleteMessage(event: any) {
    event.target.closest('li').remove();
  }

  // Copy Message
  copyMessage(event: any) {
    navigator.clipboard.writeText(event.target.closest('li').querySelector('p').innerHTML);
  }

  // Delete All Message
  deleteAllMessage(event: any) {
    var allMsgDelete: any = document.querySelector('.chat-conversation')?.querySelectorAll('li');
    allMsgDelete.forEach((item: any) => {
      item.remove();
    })
  }

  // Emoji Picker
  showEmojiPicker = false;
  sets: any = [
    'native',
    'google',
    'twitter',
    'facebook',
    'emojione',
    'apple',
    'messenger'
  ]
  set: any = 'twitter';
  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event: any) {

    const { emoji } = this;
    if (this.formData.get('message').value) {
      var text = `${emoji}${event.emoji.native}`;
    } else {
      text = event.emoji.native;
    }
    this.emoji = text;
    this.showEmojiPicker = false;
  }

  onFocus() {
    this.showEmojiPicker = false;
  }

  onBlur() {
  }

  closeReplay() {
    document.querySelector('.replyCard')?.classList.remove('show');
  }

  // Contact Search
  ContactSearch() {
    var input: any, filter: any, ul: any, li: any, a: any | undefined, i: any, txtValue: any;
    input = document.getElementById("searchContact") as HTMLAreaElement;
    filter = input.value.toUpperCase();
    ul = document.querySelectorAll(".chat-list");
    ul.forEach((item: any) => {
      li = item.getElementsByTagName("li");
      for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("h5")[0];
        txtValue = a?.innerText;
        if (txtValue?.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
        } else {
          li[i].style.display = "none";
        }
      }
    })
  }

}
