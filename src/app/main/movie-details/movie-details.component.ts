import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../api.service';
import { Movie } from '../../models/Movie';
import { faStar } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  @Input() movie: Movie;
  @Output() updateMovie = new EventEmitter<Movie>();
  rateHovered = 0;
  faStar = faStar;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }
  rateHover(rate: number) {
    this.rateHovered = rate;
  }
  rateClicked(rate: number) {
    this.apiService.rateMovie(rate, this.movie.id).subscribe(
      result => this.getDetails(),
      error => console.log(error)
    );
  }
  getDetails() {
    this.apiService.getMovie(this.movie.id).subscribe(
      (movie: Movie) => {
        this.updateMovie.emit(movie);
      },
      error => console.log(error)
    );
  }
}
