const AcroFlowsService = {
  getAllFlows(db) {
    return db
      .select('*')
      .from('acroyoga_flows');
  },
  insertFlow(db, newFlow) {
    return db
      .insert(newFlow)
      .into('acroyoga_flows')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },
  getFlowById(db, id) {
    return db
      .select('*')
      .from('acroyoga_flows')
      .where({ id })
      .first();
  },
  deleteFlow(db, id) {
    return db
      .from('acroyoga_flows')
      .where({ id })
      .delete();
  },
  updateFlow(db, id, newData) {
    return db
      .from('acroyoga_flows')
      .where({ id })
      .update(newData);
  }
};

module.exports = AcroFlowsService;