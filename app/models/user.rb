class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :todo_items, dependent: :destroy  # one user has many todos, and user deleted, todo deleted
  has_many :tags, through: :todo_items, dependent: :destroy
end
