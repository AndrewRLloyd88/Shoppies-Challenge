class Movie < ApplicationRecord
  has_many :nominations,
  :dependent => :destroy
end
