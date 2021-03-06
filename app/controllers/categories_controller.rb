class CategoriesController < ApplicationController
  before_action :set_category, only: %i[show edit update destroy]

  # GET /categories
  # GET /categories.json
  def index
    parametersarray = Array.new
    params[:pubIds].nil? ? parametersarray  : params[:pubIds].each {|p| parametersarray << p}
    parametersarray.empty? ? @categories = Category.all : @categories= self.getPublicationCategories(parametersarray)
  end

  def getPublicationCategories(parametersarray)

    results = Array.new
    parametersarray.each do |p|
      result = Category
          .all
          .includes(:publications)
          .where('publications.id = ?', p)
          .references(:publications)
      results.push(result)
    end
    categories = Set.new
    results.each do |r|
      r.each do |c|
        #categories << c
        categories.add(c)
      end
    end

    if categories.empty? then
      return Category.all
    else
      return categories
    end
  end

  # GET /categories/1
  # GET /categories/1.json
  def show; end

  # GET /categories/new
  def new
    @category = Category.new
    @layer = Layer.find(params[:layer])
  end

  # GET /categories/1/edit
  def edit; end

  # POST /categories
  # POST /categories.json
  def create
    @category = Category.new(category_params)

    respond_to do |format|
      if @category.save
        format.html { redirect_to '/publications/new', notice: 'Category was successfully created.' }
        format.json { render :show, status: :created, location: @category }
      else
        format.html { render :new }
        format.json { render json: @category.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /categories/1
  # PATCH/PUT /categories/1.json
  def update
    respond_to do |format|
      if @category.update(category_params)
        format.html { redirect_to @category, notice: 'Category was successfully updated.' }
        format.json { render :show, status: :ok, location: @category }
      else
        format.html { render :edit }
        format.json { render json: @category.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /categories/1
  # DELETE /categories/1.json
  def destroy
    @category.destroy
    respond_to do |format|
      format.html { redirect_to categories_url, notice: 'Category was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_category
    @category = Category.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def category_params
    params.require(:category).permit(:name, :layer_id, :description, :infolink)
  end
end
