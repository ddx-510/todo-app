class Api::V1::TagsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_tag, only: [:show, :edit, :update, :destroy]
    def index
        @tags  = current_user.tags.all
    end

    def show
        if authorized?
            respond_to do |format|
              format.json { render :show }
            end
        else
            handle_unauthorized
        end
    end

    def create
      @tag = current_user.tags.build(tag_params)
      if authorized?
        respond_to do |format|
          if @tag.save
            format.json { render :show, status: :created, location: api_v1_tag_path(@tag) }
          else
            format.json { render json: @tag.errors, status: :unprocessable_entity }
          end
        end
      else
        handle_unauthorized
      end
    end

    def update
      if authorized?
          respond_to do |format|
            if @tag.update(tag_params)
              format.json { render :show, status: :ok, location: api_v1_tag_path(@tag) }
            else
              format.json { render json: @tag.errors, status: :unprocessable_entity }
            end
          end
      else
          handle_unauthorized
      end
    end

    def destroy
      if authorized?
          @tag.destroy
          respond_to do |format|
            format.json { head :no_content }
          end
      else
          handle_unauthorized
      end
    end
    private
        def set_tag
            @tag = Tag.find(params[:id])
        end

        def authorized?
            @tag.user == current_user
        end

        def handle_unauthorized
            unless authorized?
              respond_to do |format|
                format.json { render :unauthorized, status: 401 }
              end
            end
        end

        def tag_params
          params.require(:tag).permit(:name)
        end
end
