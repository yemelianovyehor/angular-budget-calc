import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BudgetItem } from 'src/shared/models/budget-item.module';
import { BudgetService } from 'src/app/services/budget.service';
import { UpdateEvent } from '../budget-item-list/budget-item-list.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnChanges {

  budgetItems: BudgetItem[] = new Array<BudgetItem>();

  totalBudget:number=0;

  constructor(private budgetService: BudgetService) { }

  ngOnInit(): void {
    this.budgetService.getBudget().subscribe((items) => (this.updateData(items)));
  }

  updateData(items:BudgetItem[]){
    this.budgetItems=items;
    items.forEach(element => {
      this.totalBudget+=element.amount
    });
  }

  ngOnChanges(changes: SimpleChanges){
    console.log("changes" + changes);
  }

  addItem(newItem: BudgetItem) {
    this.budgetService.addBudgetItem(newItem).subscribe((item) => (this.budgetItems.push(item)));
    this.totalBudget+=newItem.amount;
  }

  deleteItem(item: BudgetItem) {
    this.budgetService.deleteBudgetItem(item).subscribe(() =>
      (this.budgetItems = this.budgetItems.filter(i => (i.id != item.id))));
    this.totalBudget-=item.amount;
  }

  updateItem(update: UpdateEvent){
    let oldItem = update.old;
    let newItem = update.new;
    newItem.id=oldItem.id;

    this.budgetService.updateBudgetItem(oldItem, newItem).subscribe(() =>
      this.budgetItems[this.budgetItems.indexOf(oldItem)] = newItem);

    this.totalBudget-=oldItem.amount;
    this.totalBudget+=newItem.amount;
  }

}
