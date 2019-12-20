/**
 * Used to compare two outlines. Titles can be out of order, but must
 * be at the same level and in the same "group". Doubly linked.
 */
export class OutlineSkeleton {
  title: string;
  outlines: Map<string, OutlineSkeleton>;
  prev?: OutlineSkeleton | null = null;
  display = true;

  /**
   * Creates an instance of outline skeleton.
   * @param title - data for the linked list
   */
  constructor(title: string, prev?: OutlineSkeleton, display?: boolean) {
    this.title = title;
    this.outlines = new Map();
    this.prev = prev;
    this.display = display || true; // If undefined, display is true.
  }

  /**
   * Adds a next link, allows option of creating a filler link
   * @param n - new data
   * @returns added link
   */
  addNext(n: string, display?: boolean) {
    if (this.outlines.has(n)) {
      return this.outlines.get(n);
    }
    let future = new OutlineSkeleton(n, this, display || true);
    this.outlines.set(n, future);
    return future;
  }

  /**
   * Equals outline skeleton
   * @param o - Two heads of doubly linked list to compare
   * @returns whether the skeletons are combinations of each other
   */
  equals(o: OutlineSkeleton) {
    if (this.outlines) {
      Array.from(this.outlines.keys()).forEach(ele => {
        if (!o.outlines.has(ele)) {
          return false;
        }
      }); // What if o.nextStrs has more eles than this.nextStrs?
      Array.from(this.outlines.values()).forEach(ele => {
        let corr = o.outlines.get(ele.title);
        if (corr) {
          if (!ele.equals(corr)) {
            // Recursive
            return false;
          }
        } else {
          return false;
        }
      });
    }
    return true;
  }
}

export class OutlineDS {
  input: string;
  ds: Array<[string, number]> = [];
  head: OutlineSkeleton;
  levels: Map<string, number>;
  maxLevel = 0;

  /**
   * Creates ds, an array of outline words mapped to levels
   * Creates head, a doubly linked list to create DOM output and check equality
   * Creates levels, which maps tags to levels
   * @param input - HTML input from reactquill editor
   */
  constructor(input: string) {
    this.input = input;
    this.levels = new Map<string, number>();
    this.head = new OutlineSkeleton("head");
    let curr = this.head, // list iterator
      prevLevel = -1; // tracks levels
    let firstSeen: Map<string, number> = new Map<string, number>();

    for (let tag of ["<h1>", "<h2>", "<h3>", "<strong>"]) {
      let loc = input.indexOf(tag);
      if (loc !== -1) {
        firstSeen.set(tag, loc);
        this.levels.set(tag, this.maxLevel);
        this.maxLevel += 1;
      }
    }

    while (firstSeen.size) {
      let tag = "",
        ind = Infinity;
      firstSeen.forEach((v: number, k: string) => {
        if (v < ind) {
          tag = k;
          ind = v;
        }
      });
      let oppInd = input.indexOf(this.opp(tag), ind);
      let data = input.slice(ind + tag.length, oppInd);
      let times = this.levels.get(tag) || 0;
      this.ds.push([data, times]);

      if (times - prevLevel > 1) {
        // Like placing an <h1> then a <strong>
        for (let i = 0; i < times - prevLevel - 1; i++) {
          let filler = curr.addNext("", false);
          if (filler) {
            curr = filler;
          }
        }
      } else if (times - prevLevel < 1) {
        for (let i = 0; i < prevLevel - times + 1; i++) {
          if (curr.prev) {
            curr = curr.prev;
          } else {
            // Like placing a <strong> then an <h1>
            curr.prev = new OutlineSkeleton("", undefined, false);
            curr = curr.prev;
          }
        }
      }
      let future = curr.addNext(data);
      if (future) {
        curr = future;
      }
      prevLevel = times;

      let loc = input.indexOf(tag, ind + 1);
      loc === -1 ? firstSeen.delete(tag) : firstSeen.set(tag, loc);
    }
  }

  /**
   * Takes an opening tag and returns closing tag
   * @param highlight - the opening tag
   * @returns the closing tag
   */
  opp(highlight: string): string {
    return highlight.slice(0, 1) + "/" + highlight.slice(1);
  }

  /**
   * Equals outline
   * @param o - outline to be comparing
   * @returns true if equals
   */
  equals(o: OutlineDS): boolean {
    if (o.maxLevel !== this.maxLevel) {
      return false;
    }
    return this.head.equals(o.head);
  }
}
