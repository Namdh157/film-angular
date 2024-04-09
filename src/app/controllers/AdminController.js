const API_URL = 'http://localhost:3000/movieList';
const API_URL_ACCOUNT = 'http://localhost:3000/account';

function movieController($scope, $http, $location, $routeParams) {
    $scope.allMovies = () => {
        $http.get(API_URL).then((response) => {
            $scope.movies = response.data;
        });
    }
    $scope.allMovies();
    $scope.editMovie = (id) => {
        $location.path(`/admin/movie/edit/${id}`);
    }
    $scope.deleteMovie = (id) => {
        if (confirm("xác nhận xóa")) {
            $http.delete(`${API_URL}/${id}`).then((response) => {
                if (response.status == 201) {
                    $scope.allMovies()
                }
            });
        }
    }
    if ($routeParams.id) {
        $http.get(`${API_URL}/${$routeParams.id}`).then(function ($response) {
            $scope.p = $response.data; 
            $scope.edit = {
                name: $response.data.name,
                category: $response.data.category,
                update: $response.data.update,
                imgMin: $response.data.imgMin,
                imgMax: $response.data.imgMax,
                video: $response.data.video
            }
        })
    }
    $scope.onEdit = () => {
        let valid = true;
        if (!$scope.edit.name || !$scope.edit.category || !$scope.edit.imgMin || !$scope.edit.imgMax || !$scope.edit.video) {
            valid = false;
        }
        if (valid) {
            $http.put(`${API_URL}/${$routeParams.id}`, $scope.edit).then((response) => {
                console.log(response);
                if (response.status == 200) {
                    $location.path('/admin/movies');
                } else {
                    alert('Cập nhật không thành công');
                }
            });
        } else {
            alert("Thông tin không hợp lệ");
        }
    }
    $scope.onCreate = () => {
        let valid = true;
        if (!$scope.create.name || !$scope.create.category || !$scope.create.imgMin || !$scope.create.imgMax || !$scope.create.video) {
            valid = false;
        }
        if (valid) {
            $http.post(API_URL, $scope.create).then((response) => {
                if (response.status == 201) {
                    alert("Thêm thành công");
                    $location.path('/admin/movies')
                } else {
                    alert("Thêm thất bại")
                }
            })
        } else {
            alert("Thông tin không hợp lệ");
        }
    }

}

function accountController($scope, $http) {
    $http.get(API_URL_ACCOUNT).then((response) => {
        $scope.accounts = response.data;
        console.log($scope.accounts);
    });
}

export {
    accountController,
    movieController
}