class TodoItem < ApplicationRecord
  default_scope { order(created_at: :desc) } # default scope : newest appear first
  belongs_to :user
  validates :title, presence: true
  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings

  def all_tags=(tags_string)
    tag_names = tags_string.split(",").collect{|s| s.strip.downcase}.uniq
    new_or_found_tags = tag_names.collect { |tagname| Tag.find_or_create_by(name: tagname) }
    self.tags = new_or_found_tags
  end

  def all_tags
    self.tags.collect do |tag|
      tag.name
    end.join(", ")
  end

end
