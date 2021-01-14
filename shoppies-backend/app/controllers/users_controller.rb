class UsersController < ApplicationController

  def create
    @user = User.create!(user_param)
    @user.update_attributes(access_token: SecureRandom.hex)

    render json: @user
  end

end