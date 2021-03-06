
Rails.application.routes.draw do

  scope '/api' do
    resources :users
    get :slug, to: "nominations#slug"
    get :total, to: "nominations#total"
    resources :nominations
    resources :movies do
      put :nomination, on: :member
    end
    resources :sessions
    resources :registrations
    delete :logout, to: "sessions#logout"
    get :logged_in, to: "sessions#logged_in"
  end    

  get '*path', to: "static#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end