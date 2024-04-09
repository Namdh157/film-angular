export function getItemData(type, quantity) {
    var url = 'http://localhost:3000/movieList';
    $scope.getItem = () => {
        $http.get(url).then( ($res, $req) => {
            var data = $res.data;
            var filterData = data.filter( (item) => {
                if(item.category.includes(type)) {
                    return item.category
                }
            });
            var limitedData = filterData.slice(0, quantity);
            return $scope.filteredData = limitedData;
        })
    }
}