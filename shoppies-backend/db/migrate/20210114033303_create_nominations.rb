class CreateNominations < ActiveRecord::Migration[6.1]
  def change
    create_table :nominations do |t|
      t.references :users, null: false, foreign_key: true
      t.references :movies, null: false, foreign_key: true

      t.timestamps
    end
  end
end
