import Line from './line.js';

export default function Frame({ nodes, adjacencies }) {
  this.nodes = nodes;
  this.adjacencyList = adjacencies;
}

Frame.prototype = {
  constructor: Frame,
  drawLineBetween(startNode, endNode) {
    this.lines.push(
      new Line({
        startNode,
        endNode,
      })
    );
  },
  drawLines() {
    this.lines = [];
    this.nodes.forEach((startNode, i) => {
      this.adjacencyList[i].forEach(j => {
        // avoid drawing each line twice
        if (i < j) {
          this.drawLineBetween(startNode, this.nodes[j]);
        }
      });
    });
  },
  linesOutFrom(node) {
    return this.lines.filter(line => line.visits(node));
  },
  firstUncrossedLine() {
    return this.lines.find(line => line.uncrossed());
  },
};
