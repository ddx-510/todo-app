class Tag < ApplicationRecord
  belongs_to :user, optional: true
  has_many :taggings
  has_many :posts, through: :taggings
end
