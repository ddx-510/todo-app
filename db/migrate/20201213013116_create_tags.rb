class CreateTags < ActiveRecord::Migration[6.0]
  def change
    create_table :tags do |t|
      t.string :content
      t.references :todo_item, null: false, foreign_key: true

      t.timestamps
    end
  end
end
