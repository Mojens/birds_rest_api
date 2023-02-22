let lastBirdId = 0;

const Birds = [
    { id: getNextId(), type: 'Pigeon', color: 'White' },
    { id: getNextId(), type: 'Eagle', color: 'Brown' },
    { id: getNextId(), type: 'Parrot', color: 'Green' },
    { id: getNextId(), type: 'Duck', color: 'Yellow' },
    { id: getNextId(), type: 'Owl', color: 'Black' },
    { id: getNextId(), type: 'Swan', color: 'White' }
];

function getNextId() {
  lastBirdId++;
  return lastBirdId;
}
module.exports = {
  Birds,
  getNextId
};