class Tag < ApplicationRecord
  default_scope { order(created_at: :desc) }
  belongs_to :todo_item
  validates :content, presence: true
end
