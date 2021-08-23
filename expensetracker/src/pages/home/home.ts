import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ExpenseServiceProvider } from '../../providers/expense-service/expense-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Expense Tracker App";

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public expenseService: ExpenseServiceProvider, public inputDialogService: InputDialogServiceProvider, public socialSharing: SocialSharing, public mediaCapture: MediaCapture) {

  }

  loadExpenses() {
    return this.expenseService.getExpenses();
  }

  deleteExpense(expense, index) {
    console.log("Deleting expense - ", expense, index);
    const toast = this.toastCtrl.create({
      message: "Deleting expense - " + expense.name + "...",
      duration: 3000
    });
    toast.present();
    this.expenseService.removeExpense(index);
  }

  shareExpense(expense, index) {
    console.log("Sharing expense - ", expense, index);
    const toast = this.toastCtrl.create({
      message: "Sharing expense - " + expense.name + "...",
      duration: 3000
    });
    toast.present();

    let message = "Expense Item - Name: " + expense.name + " - Quantity: " + expense.quantity;
    let subject = "Shared via Expense Tracker App";

    this.socialSharing.share(message, subject).then(() => {
      //Sharing via email is possible
      console.log("Shared successfully!");
    }).catch((error) => {
      //Sharing via email is not possible 
      console.error("Error sharing expense ", error);
    });
  }

  captureReceipt() {
    console.log("Capturing photo of receipt...");

    let options: CaptureImageOptions = { limit: 3 }
    this.mediaCapture.captureImage(options)
      .then(
        (data: MediaFile[]) => console.log(data),
        (err: CaptureError) => console.error(err)
      );
  }

  editExpense(expense, index) {
    console.log("Editing expense - ", expense, index);
    const toast = this.toastCtrl.create({
      message: "Editing expense - " + expense.name + "...",
      duration: 3000
    });
    toast.present();
    this.inputDialogService.showPrompt(expense, index);    
  }

  addExpense() {
    console.log("Adding item...");
    this.inputDialogService.showPrompt();
  }

}
