# Add a controller for user session
class SessionsController < ApplicationController
  skip_before_action :restrict_access, only: [:create, :destroy]

  def new
  end

  def logged_in
    if @current_user
      render json: {
        logged_in: true,
        user: @current_user,
      }
    else
      render json: {
        logged_in: false
      }
    end
  end

  def logout
    @current_user.update_attributes(access_token: nil)
    render json: { status: 200, logged_out: true }
  end

  def create
    puts params
    if @user = User.authenticate_with_credentials(params)
    # Does an existing user put in the correct password?
    # if @user = User.authenticate_with_credentials(params[:slug])
      # We distribute a token
      # user remains 'logged_in' (remembered) as they navigate page to page
      @user.update_attributes(access_token: SecureRandom.hex)
      render json: {
        status: :created,
        logged_in: true,
        user: @user
      }
    end
  end

#destroy cookie on logout
  def destroy
  end

end