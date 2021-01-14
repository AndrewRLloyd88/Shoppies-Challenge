class User < ApplicationRecord
  def self.authenticate_with_credentials(slug)
    if @user && @user.authenticate(slug)
      return @user
    end
    nil
  end
end
