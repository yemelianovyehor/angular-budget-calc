import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { BudgetItem } from 'src/shared/models/budget-item.module';
import { MatDialog } from '@angular/material/dialog';
import { EditItemModalComponent } from '../edit-item-modal/edit-item-modal.component';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-budget-item-list',
  templateUrl: './budget-item-list.component.html',
  styleUrls: ['./budget-item-list.component.scss']
})


export class BudgetItemListComponent implements OnInit {

  @Input() budgetItems!: BudgetItem[];
  @Output() delete: EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>();
  @Output() update: EventEmitter<UpdateEvent> = new EventEmitter<UpdateEvent>();
  
  editState:boolean=false;

  constructor(public dialog: MatDialog, private budgetService: BudgetService) { }

  ngOnInit(): void {
  }

  onDelete(item: BudgetItem) {
    this.delete.emit(item);
  }

  onCardClicked(item: BudgetItem) {
    //display edit-modal
    if(!this.editState){
      this.editState=true;
      const dialogRef = this.dialog.open(EditItemModalComponent, {
        width: "580px",
        data: new BudgetItem(item.description, item.amount)

      });

      dialogRef.afterClosed().subscribe(result => {
        this.editState=false;
        this.update.emit({
          old: item,
          new: result
        });


    })
    }

  }
}

export interface UpdateEvent {
  old: BudgetItem;
  new: BudgetItem;
}