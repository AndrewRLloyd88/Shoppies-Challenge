class MoviesController < ApplicationController
  skip_before_action :restrict_access, only: [ :movie_param, :destroy]


  def create
    if !Movie.exists?(movie_params)
    @movie = Movie.create!(movie_params)
    end
    @movie = Movie.where(movie_title: movie_params[:movie_title], movie_year: movie_params[:movie_year] ).first
    # @movie = movie[:id]
    puts @current_user.inspect
    # @user = user_params[:userID]
    @current_user.nominated_movies << @movie
  end

  def index
    @movies = Movie.joins(:nominations).select('*').where(nominations: {user_id: @current_user.id})
    render json: @movies.to_json
  end

  def destroy
    @nomination = Nomination.find(params[:id])
    Nomination.delete(@nomination)
    # @current_user.nominated_movies.delete(@nomination)
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

  def user_params
    params.require(:user)
    .permit([
      :userID
    ])
  end
end