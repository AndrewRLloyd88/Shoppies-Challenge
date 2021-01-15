class Nomination < ApplicationRecord
  belongs_to :user
  belongs_to :movie

  scope :is_nominated, -> (nomination) {joins(:user).where(user_id: users.id)}
end
