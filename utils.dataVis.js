angular.module('utils.dataVis',[])
    .filter('strToHSL', function() {
        /*
            Converts a string to a constant HSL string
        */
        return function(input) {
            return intToHSL(getHashCode(input));
        };

        function intToHSL(int) {
            var shortened = int % 360;
            return "hsl(" + shortened + ",100%,30%)";
        };

        function getHashCode(str) {
            var hash = 0;
            if (str.length == 0) return hash;
            for (var i = 0; i < str.length; i++) {
                hash = str.charCodeAt(i) + ((hash << 5) - hash);
                hash = hash & hash; // Convert to 32bit integer
            }
            return hash;
        };
    })
    .filter('normalise', function() {
        /*
            Maps a value between [0,1] to [2,3]
            {{ someInt | normalise:1:10:50:-20 }}
        */
        return function(input, min, max, newMin, newMax) {
            var ratio = (max > min) ? input / (max - min) : input / (min - max)
              , range = (max < min) ? (max - min) : (min - max)
              , newRange = (max < min) ? (newMax - newMin) : (newMin - newMax)
              , output;

            return (newMax > newMin)
                   ? newMax - (newRange * ratio)
                   : newMin - (newRange * ratio)
        }

        // --------------

        function intersectionObjects() {
            var Results = arguments[0]
              , LastArgument = arguments[arguments.length - 1]
              , ArrayCount = arguments.length
              , areEqualFunction = _.isEqual;
            if (typeof LastArgument === "function") {
                areEqualFunction = LastArgument;
                ArrayCount--;
            }
            for (var i = 1; i < ArrayCount; i++) {
                var array = arguments[i];
                Results = intersectionObjects2(Results, array, areEqualFunction);
                if (Results.length === 0) break;
            }
            return Results;
        }

        function intersectionObjects2(a, b, areEqualFunction) {
            var Result = [];
            for (var i = 0; i < a.length; i++) {
                var aElement = a[i]
                  , existsInB = _.any(b, function(bElement) {
                    return areEqualFunction(bElement, aElement);
                });
                if (existsInB) {
                    Result.push(aElement);
                }
            }
            return Result;
        }
    })
