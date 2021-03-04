const AcroElementsService = {
  getAllAcroElements(db) {
    return db
      .select('*')
      .from('acroyoga_elements');
  },
  insertAcroElement(db, newElement) {
    return db
      .insert(newElement)
      .into('acroyoga_elements')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },
  getBySlugId(db, element_slug_id) {
    return db
      .select('*')
      .from('acroyoga_elements')
      .where({ element_slug_id })
      .first();
  },
  getByElementId(db, element_id) {
    return db
      .select('*')
      .from('acroyoga_elements')
      .where({ element_id })
      .first();
  },
  deleteAcroElement(db, id) {
    return db
      .from('acroyoga_elements')
      .where({ id })
      .delete();
  },
  updateAcroElement(db, element_id, newData) {
    return db
      .from('acroyoga_elements')
      .where({ element_id })
      .update(newData);
  }
};

module.exports = AcroElementsService;