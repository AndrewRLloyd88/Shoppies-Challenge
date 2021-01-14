class User < ApplicationRecord
  has_many :nominations, :dependent => :destroy
  has_many :nominated_movies, through: :nominations, source: :movie
  def self.authenticate_with_credentials(slug)
    if @user && @user.authenticate(slug)
      return @user
    end
    nil
  end
end
