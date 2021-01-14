class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string "access_token"
      t.string   "slug",        limit: 255, default: (Rails.env.staging? ? "uuid_generate_v4();" : 0), null: false
      t.index ["access_token"], name: "index_users_on_access_token", unique: true

      t.timestamps
    end
  end
end
