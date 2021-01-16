class NominationsController < ApplicationController
  skip_before_action :restrict_access, only:[:index, :show, :slug, :total]
  def index
    @nominations = Nomination.find(7)
    render json: @nominations.to_json
  end

  def show
    # takes in a slug from user e.g. http://localhost:3001/api/nominations/7c5dec-e47-4c4e-a3ce-280a3b38ce5b
    slug = params[:id]
    #joins from movies to nominations to user and gets all associated movies by slug
    @nominatedMoviesFromSlug = Movie.joins(nominations: :user).where("slug=?", slug).all
    render json: @nominatedMoviesFromSlug.to_json
  end

  def slug
    # takes in a slug from user e.g. http://localhost:3001/api/nominations/7c5dec-e47-4c4e-a3ce-280a3b38ce5b
    slug = params[:slug]
    #joins from movies to nominations to user and gets all associated movies by slug
    @nominatedMoviesFromSlug = Movie.joins(nominations: :user).where("slug=?", slug).all
    render json: @nominatedMoviesFromSlug.to_json
  end

  #get total number of people who have nominated 5 movies
  def total
    @totalPeopleWith5Nominations = Nomination.group(:user_id).having(count: 5).count
    @counted = @totalPeopleWith5Nominations.count
    render json: @counted
  end
end