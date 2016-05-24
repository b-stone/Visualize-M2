

    /*var nodes = [
    		{"name": "1"},
    		{"name": "2"},
    		{"name": "3"},
    		{"name": "4"},
    		{"name": "5"},
    		{"name": "6"}
    	],
    	links = [
    		{"source":0,"target":1,"value":1},
    		{"source":0,"target":2,"value":1},
            {"source":0,"target":3,"value":1},
    		{"source":0,"target":4,"value":1},
            {"source":0,"target":5,"value":1},
    		{"source":1,"target":3,"value":1},
    		{"source":2,"target":5,"value":1},
            {"source":4,"target":3,"value":1}
    	],
        faces = [
            {"v1": 0,"v2": 4,"v3": 3},
            {"v1": 0,"v2": 1,"v3": 3},
            {"v1": 0,"v2": 2,"v3": 5}
        ];*/
        
    ///*
    var nodes = [{"name": "a"}, {"name": "b"}, {"name": "c"}, {"name": "d"}, {"name": "e"}, {"name": "f"}],
        links = [{"source": 0, "target": 1}, {"source": 0, "target": 2}, {"source": 0, "target": 3},
           {"source": 0, "target": 4}, {"source": 0, "target": 5}, {"source": 1, "target": 2},
           {"source": 1, "target": 3}, {"source": 1, "target": 4}, {"source": 1, "target": 5},
           {"source": 2, "target": 3}, {"source": 2, "target": 4}, {"source": 2, "target": 5},
           {"source": 3, "target": 4}, {"source": 3, "target": 5}, {"source": 4, "target": 5}],
        faces = [{"v1": 0,"v2": 1,"v3": 3}, {"v1": 0,"v2": 1,"v3": 4}, {"v1": 0,"v2": 2,"v3": 3}, {"v1":
           0,"v2": 2,"v3": 5}, {"v1": 0,"v2": 4,"v3": 5}, {"v1": 1,"v2": 2,"v3": 4}, {"v1": 1,"v2":
           2,"v3": 5}, {"v1": 1,"v2": 3,"v3": 5}, {"v1": 2,"v2": 3,"v3": 4}, {"v1": 3,"v2": 4,"v3": 5}];
    //*/


    /*
    var nodes = visNodes,
        links = visEdges,
        faces = vis2Faces;
    //*/    
        
    var width = 960,
        height = 500;

    var color = d3.scale.category20();

    var force = d3.layout.force()
        .charge(-1000)
        .linkDistance(150)
        .size([width, height]);

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr('id', 'canvasElement2d');

    force
      .nodes(nodes)
      .links(links)
      .start();

    var face = svg.selectAll(".face")
      .data(faces)
    .enter().append("polygon")
      .attr("class", "face")
      .attr("points", function(d) { return nodes[d.v1].x + "," + nodes[d.v1].y + " " + nodes[d.v2].x + "," + nodes[d.v2].y + " " + nodes[d.v3].x + "," + nodes[d.v3].y; })
      .style("fill", function(d,i) { return color(i); })
      .style("opacity", .4)
      //.attr("style", function(d,i) { return "fill:" + color(200) + ";opacity:.4";})
      .each(function(d,i) { console.log( "fill:" + color(200) + ";opacity:.4" );});
        
    var link = svg.selectAll(".link")
      .data(links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.sqrt(d.value); });

    var node = svg.selectAll(".node")
      .data(nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", 8)
      .style("fill", color(1))
      .call(force.drag);
        
    node.append("text")
          .attr("dx", 12)
          .attr("dy", ".35em")
          .text(function(d) { return d.name });

    node.append("title")
      .text(function(d) { return d.name; });

    //console.log(node);
    //console.log(face);
        
    force.on("tick", function() {
        face.attr("points", function(d) { return nodes[d.v1].x + "," + nodes[d.v1].y + " " + nodes[d.v2].x + "," + nodes[d.v2].y + " " + nodes[d.v3].x + "," + nodes[d.v3].y; });

        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node.attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
    });
        