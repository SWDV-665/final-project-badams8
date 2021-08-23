import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { ExpenseServiceProvider } from '../../providers/expense-service/expense-service';

/*
  Generated class for the InputDialogServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InputDialogServiceProvider {

  constructor(public alertCtrl: AlertController, public expenseService: ExpenseServiceProvider) {
    console.log('Hello InputDialogServiceProvider Provider');
  }

  showPrompt(expense?, index?) {
    const prompt = this.alertCtrl.create({
      title: expense ? 'Edit Expense' : 'Add Expense',
      message: expense ? "Please edit expense info..." : "Please enter expense info...",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: expense ? expense.name : null
        },
        {
          name: 'quantity',
          placeholder: 'Quantity',
          value: expense ? expense.quantity : null
        },
        {
          name: 'price',
          placeholder: 'Price',
          value: expense ? expense.price                                       : null
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: expense => {
            console.log('Save clicked', expense);
            if (index !== undefined) {
              this.expenseService.editExpense(expense, index);
            }
            else{
              this.expenseService.addExpense(expense);
            }
            
          }
        }
      ]
    });
    prompt.present();
  }

}
