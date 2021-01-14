class CreateMoviesTable < ActiveRecord::Migration[6.1]
  def change
    create_table :movies do |t|
      t.string :movie_title
      t.string :movie_year
      t.string :movie_poster

      t.timestamps
    end
  end
end
