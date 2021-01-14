class ApplicationController < ActionController::API
  # include ActionController::RequestForgeryProtection
  include ActionController::RequestForgeryProtection
  include ActionController::HttpAuthentication::Token::ControllerMethods

  puts "in application controller"
  protect_from_forgery with: :exception
  skip_before_action :verify_authenticity_token
  before_action :restrict_access

  def restrict_access
    authenticate_or_request_with_http_token do |token|
      # puts "in application controller"
      @current_user = User.find_by(access_token: token)
    end
  end
end