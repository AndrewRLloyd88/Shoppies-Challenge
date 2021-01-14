class MoviesController < ApplicationController
  skip_before_action :restrict_access, only: [:slug, :index, :show, :create, :update, :destroy, :movie_param]


  def create
    @movie = Movie.create!(movie_params)
  end

  private
  def movie_params
    params.require(:movieNomination)
    .permit([
      :movie_title,
      :movie_year,
      :movie_poster
    ]
    );
  end
end