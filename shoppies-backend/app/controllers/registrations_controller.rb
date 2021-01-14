class RegistrationsController < ApplicationController
  skip_before_action :restrict_access
  
  def create
    @user = User.create!(
      slug: params['slug'],
      access_token: SecureRandom.hex
    )

    if @user
      render json: {
        status: :created,
        user: @user
      }
    else
      render json: { status: 500 }
    end
  end
end
