var width = 960,
    height = 500;

var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-120)
    .linkDistance(50)
    .gravity(0.1)
    .size([width, height]);

var svg = d3.select("#example").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("/postassets/contacts.json", function (error, graph) {
    force.nodes(graph.nodes)
        .links(graph.links)
        .start();

    var link = svg.selectAll(".link")
        .data(graph.links)
        .enter().append("line")
        .attr("class", function (d) {
            return d.type;
        })
        .style("stroke-width", function (d) {
            return Math.sqrt(d.value);
        });

    link.append("title")
        .text(function (d) {
            return d.type;
        });

    var node = svg.selectAll(".node")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("class", "node")
        .attr("r", function (d) {getRadius(d)})
        .style("fill", function (d) {
            return color(d.type);
        })
        .on("dblclick", dblclick)
        .call(force.drag);

    node.append("title")
        .text(function (d) {
            return d.name;
        });

    force.on("tick", function (e) {

        var k = 6 * e.alpha;
        graph.links.forEach(function (d, i) {
            d.source.y -= k;
            d.target.y += k;
        });

        link.attr("x1", function (d) {
            return d.source.x;
        })
        .attr("y1", function (d) {
                return d.source.y;
        })
            .attr("x2", function (d) {
                return d.target.x;
        })
            .attr("y2", function (d) {
                return d.target.y;
        });

        node.attr("cx", function (d) {
            return d.x;
        })
            .attr("cy", function (d) {
                return d.y;
        });

    });

    force.drag()
        .on("dragstart", dragstart);

    function getRadius(d) {
        switch (d.type) {
            case "company":
                return 15;
            case "manager":
                return 10;
            case "person":
                return 5;
        }
    };

    function dblclick(d) {
        d3.select(this).classed("fixed", d.fixed = false);
    }

    function dragstart(d) {
        d3.select(this).classed("fixed", d.fixed = true);
    }
});
