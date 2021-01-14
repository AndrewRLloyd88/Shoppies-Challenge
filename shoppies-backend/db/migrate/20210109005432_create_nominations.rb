class CreateNominations < ActiveRecord::Migration[6.1]
  def change
    create_table :nominations do |t|
      t.string :title
      t.string :year
      t.string :image

      t.timestamps
    end
  end
end
