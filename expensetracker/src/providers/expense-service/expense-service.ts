import { Injectable } from '@angular/core';

/*
  Generated class for the ExpenseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ExpenseServiceProvider {

  expenses = [
    {
      name: "office chair",
      quantity: "2",
      price: "599"
    }
  ];

  constructor() {
    console.log('Hello ExpenseServiceProvider Provider');
  }

  getExpenses() {
    return this.expenses;
  }

  removeExpense(index) {
    this.expenses.splice(index, 1);
  }

  addExpense(expense) {
    this.expenses.push(expense);
  }

  editExpense(expense, index) {
    this.expenses[index] = expense;
  }

}
