class Facade {

  constructor(Schema) {
    this.Schema = Schema;
  }

  find(query) {
    return this.Schema
      .find(query)
      .exec();
  }

  findOne(query) {
    return this.Schema
      .findOne(query)
      .exec();
  }

  findById(id) {
    return this.Schema
      .findById(id)
      .exec();
  }

  create(input) {
    const schema = new this.Schema(input);
    return schema.save();
  }

  update(conditions, update) {
    return this.Schema
      .update(conditions, update, {new: true})
      .exec();
  }

  remove(id) {
    return this.Schema
      .findByIdAndRemove(id)
      .exec();
  }
}

module.exports = Facade;