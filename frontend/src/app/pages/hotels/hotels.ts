import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HotelsService } from '../../core/services/hotels';
import type { Hotels, CreateHotelsInput } from '../../models/hotels';

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './hotels.html',
  styleUrls: ['./hotels.css']
})
export class Hotelscomponent implements OnInit {
  private api = inject(HotelsService);

  hotelsList = signal<Hotels[]>([]);
  isFetching = false;
  currentId: string | null = null;

  formData: CreateHotelsInput = {
    name: '',
    description: '',
    location: '',
    pricePerNight: 0,
    rating: 1,
    active:true
  };

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isFetching = true;
    this.api.getHotels().subscribe({
      next: (res) => {
        this.hotelsList.set(res.data);
        this.isFetching = false;
      },
      error: (err) => {
        console.error('Failed to get hotels:', err);
        this.isFetching = false;
      }
    });
  }

  onSubmit(): void {
    if (!this.formData.name) return;

    if (this.currentId) {
      this.api.updateHotels(this.currentId, this.formData).subscribe(() => {
        this.clearAndReload();
      });
    } else {
      this.api.createHotels(this.formData).subscribe(() => {
        this.clearAndReload();
      });
    }
  }

  onSelectEdit(item: Hotels): void {
    this.currentId = item._id;
    this.formData = {
      name: item.name,
      description: item.description,
      location: item.location,
      pricePerNight: item.pricePerNight,
      rating: item.rating,
      active:item.active ?? true
    };
  }

  onRemove(id: string): void {
    this.api.deleteHotels(id).subscribe(() => {
      this.loadData();
    });
  }

  cancelEdit(): void {
    this.clearAndReload();
  }

  private clearAndReload(): void {
    this.currentId = null;
    this.formData = { name: '', description: '', location: '', pricePerNight: 0, rating: 1,active:true };
    this.loadData();
  }
}