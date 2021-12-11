class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);//original.offspring(offspring name)
    vampire.creator = this;  //this = original

  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;

  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;
    // climb "up" the tree (using iteration), counting nodes, until no creator is found
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }
    return numberOfVampires;

  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (vampire.yearConverted > vampire.creator.yearConverted) {
      return true;
    }
    return false;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    for (const vamp of this.offspring) {
      if (vamp === name) {
        const subVamp = vamp.vampireWithName(name);
        return vamp;         
      }
    } return null;    
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    
    let totalVamp = 0;
    for (const vamp of this.offspring) {
      if(vamp) {
        totalVamp++;
        const subVamp = vamp.totalDescendents;
        totalVamp += subVamp;
      } 
    }
    return totalVamp;       
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    for (const vamp of this.offspring) {
      if (vamp === this.name && vamp.yearConverted > 1980) {
        return vamp;
      }
    } return null;
    
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {

  }
}

const original =  new Vampire("Original", 200);// root node
const ansel =     new Vampire("Ansel", 300);
const bart =      new Vampire("Bart", 350);
const elgort =    new Vampire("Elgort", 400);
const sarah =     new Vampire("Sarah", 420);
const andrew =    new Vampire("Andrew", 800);

//----------ADD OFFSPRING---------------//
original.addOffspring(ansel);
original.addOffspring(bart);
ansel.addOffspring(elgort);
ansel.addOffspring(sarah);
elgort.addOffspring(andrew);

// console.log(elgort.yearConverted);
// console.log(elgort.creator.yearConverted);

module.exports = Vampire;