class TodoItem < ApplicationRecord
  default_scope { order(created_at: :desc) } # default scope : newest appear first
  belongs_to :user
  validates :title, presence: true
end
