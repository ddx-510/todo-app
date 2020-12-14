class TodoItem < ApplicationRecord
  default_scope { order(created_at: :desc) } # default scope : newest appear first
  belongs_to :user
  validates :title, presence: true
  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings


  def all_tags=(names)
    self.tags = names.split(",").map do |name|
        Tag.where(name: name.strip).first_or_create!
    end
  end

  def all_tags
    self.tags.map(&:name).join(", ")
  end

  def self.tagged_with(name)
    Tag.find_by_name!(name).todo_items
  end

end
