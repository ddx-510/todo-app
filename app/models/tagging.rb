class Tagging < ApplicationRecord
  belongs_to :todo_item
  belongs_to :tag
end
