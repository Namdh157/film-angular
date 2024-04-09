import {
    HomeController,
    DetailController,
    SeriesController,
    ContactController,
    FeedBackController,
    FaqController,
    LoginController,
    RegisterController
} from './src/app/controllers/PublicController.js';

import {
    movieController,
    accountController
}
from './src/app/controllers/AdminController.js';
// tạo route
angular.module('film-fpt', ['ngRoute']).config(['$routeProvider', ($routeProvider) => {
    $routeProvider.when('/', {
        templateUrl: './src/app/views/public/home.html',
        controller: HomeController
    }).when('/phim-bo', {
        templateUrl: './src/app/views/public/series.html',
        controller: SeriesController
    }).when('/lien-he', {
        templateUrl: './src/app/views/public/contact.html',
        controller: ContactController
    }).when('/gop-y', {
        templateUrl: './src/app/views/public/feedback.html',
        controller: FeedBackController
    }).when('/hoi-dap', {
        templateUrl: './src/app/views/public/faq.html',
        controller: FaqController
    }).when('/dang-nhap', {
        templateUrl: './src/app/views/public/login.html',
        controller: LoginController
    }).when('/dang-xuat', {
        template: '',
        controller: function ($location, $rootScope) {
            localStorage.removeItem('account');
            $location.path('/');
            $rootScope.$broadcast('checkAccount');
        }
    }).when('/dang-ki', {
        templateUrl: './src/app/views/public/register.html',
        controller: RegisterController
    }).when('/profile', {
        templateUrl: './src/app/views/public/profile.html',
        controller: function ($scope) {
            $scope.account = JSON.parse(localStorage.getItem('account'));
        }
    }).when('/detail/:title', {
        templateUrl: './src/app/views/public/detail.html',
        controller: DetailController
    }).when('/profile/bookmark', {
        templateUrl: './src/app/views/public/bookmark.html',
        controller: function ($scope, $http, $timeout) {
            $scope.account = JSON.parse(localStorage.getItem('account'));
            $http.get('http://localhost:3000/bookmark').then(($res) => {
                const data = $res.data;
                $scope.listBookmark = data;
                $scope.onDelete = (id) => {
                    if (confirm('xác nhận xóa')) {
                        $http.delete(`http://localhost:3000/bookmark/${id}`).then(($res) => {
                            if($res.status == 200) {
                                $scope.listBookmark = data;
                            } else {
                                const messeage = {
                                    title: 'Thông báo',
                                    message: 'Bạn phải đăng nhập để sử dụng chức năng này'
                                };
                                $rootScope.$broadcast('showToast', messeage);
                            }
                        });
                    }
                }
                $timeout(() => {
                    $http.get('http://localhost:3000/movieList').then(($res) => {
                        const datas = $res.data

                        function getMovieList(data, type, quantity = 30) {
                            const filterData = data.filter((item) => {
                                const categories = item.category.split(", ");
                                return categories.some(category => type.includes(category));
                            });
                            return filterData.slice(0, quantity)
                        }

                        function moviesDetail(data, id) {
                            const movie = data.find(item => item.id == id);
                            const movieRank = getMovieList(data, ['Hành động', 'Viễn tưởng', 'Siêu anh hùng'], 10);
                            let html = '';
                            movieRank.forEach((item, index) => {
                                html += `
                            <li class="play-content-rank-item">
                                <a href="" class="play-content-rank-link">
                                    <p class="fs-8 p-0 m-0"><span class="me-2">${index + 1}</span>${item.name}
                                    </p>
                                    <img src="./src/assets/img/${item.imgMax}" alt="">
                                </a>
                            </li>
                            `;
                            });
                            return `
                            <div class="player-area d-flex ">
                                <div class="play-area-video col-9">
                                    <iframe width="100%" height="600px" 
                                        loading="lazy"
                                        src="${movie.video}"
                                        title="YouTube video player" frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowfullscreen>
                                    </iframe>
                                </div>
                                <div class="play-area-episode col-3">
                                    <h5 class="text-center my-3">${movie.name}</h5>
                                    <div class="play-area-tab row ms-0 justify-content-around ">
                                        <a href="#!/detail/${convertToSlug(movie.name)}?id=${movie.id}" id="click-close" class="btn text-light col-4 tooltip-test"
                                        title="Vào xem phim"
                                            style="background-color: #2d2f34;"><span data-bs-dismiss="modal">Xem phim</span></a>
                                        <button class="btn text-main col-7" style="background-color: #23252b;">Nội dung đặc
                                            sắc</button>
                                    </div>
                                    <div class="play-area-tab-item m-3">
                                        <ul class="play-area-list list-unstyled d-flex flex-wrap">
                                            <li class="play-area-ep-item tooltip-test" title="Lựa chọn tập">1</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="player-content row">
                                <div class="player-content-left col-9 pe-3 fs-6 ">
                                    <div class="player-content-infor my-4">
                                        <h3>${movie.name}</h3>
                                        <div class="player-content-update">
                                            <span>Thời lượng: </span>
                                            <span>${movie.update}</span>
                                        </div>
                                        <div class="player-content-rate d-flex ">
                                            <div class="player-content-rate-start">
                                                <span>9.8</span>
                                                <i class="fa-solid fa-star " style="color: red"></i>
                                                <i class="fa-solid fa-star " style="color: red"></i>
                                                <i class="fa-solid fa-star " style="color: red"></i>
                                                <i class="fa-solid fa-star " style="color: red"></i>
                                                <i class="fa-solid fa-star " style="color: red"></i>
                                            </div>
                                            <div class="player-content-rate-text px-4">
                                                <span class="text-main">1.5k lượt đánh giá</span>
                                            </div>
                                            <div class="player-content-rate-own" style="color: red">
                                                Tôi muốn đánh giá
                                            </div>
                                        </div>
                                        <div class="player-content-main">
                                            <p>
                                                <span class="text-main">Thể loại: </span>${movie.category}
                                            </p>
                                            <p class="d-inline-block me-2">
                                                <span class="text-main">Khu vực: </span>Mỹ
                                            </p>
                                            <p class="d-inline-block ">
                                                <span class="text-main">Lồng tiếng: </span>Tiếng Việt
                                            </p>
                                            <p>
                                                <span class="text-main">Miêu tả: </span>Bộ phim kể về câu chuyện những siêu
                                                anh hùng và nhóm
                                                anh hùng hành động ra tay giúp đỡ mọi người cùng với những bài học sau mỗi
                                                tập phim tạo cho
                                                người xem cảm thấy thú vị và lôi cuốn...
                                            </p>
                                            <div class="list-action row">
                                                <div class="col-2 text-center ">
                                                    <div class="action-img rounded-circle ">
                                                        <img src="./src/assets/img/director.jpg" class="rounded-circle " alt="">
                                                    </div>
                                                    <div class="action-name mt-3">James Gunn</div>
                                                    <div class="action-type fs-8 text-main">Đạo diễn</div>
                                                </div>
                    
                                                <div class="col-2 text-center ">
                                                    <div class="action-img rounded-circle ">
                                                        <img src="./src/assets/img/actor1.jpg" class="rounded-circle " alt="">
                                                    </div>
                                                    <div class="action-name mt-3">Christ Pratt</div>
                                                    <div class="action-type fs-8 text-main">Diễn viên chính</div>
                                                </div>
                                                <div class="col-2 text-center ">
                                                    <div class="action-img rounded-circle ">
                                                        <img src="./src/assets/img/actor2.jpg" class="rounded-circle " alt="">
                                                    </div>
                                                    <div class="action-name mt-3">Zoe Salada</div>
                                                    <div class="action-type fs-8 text-main">Diễn viên chính</div>
                                                </div>
                                                <div class="col-2 text-center ">
                                                    <div class="action-img rounded-circle ">
                                                        <img src="./src/assets/img/actor3.jpg" class="rounded-circle " alt="">
                                                    </div>
                                                    <div class="action-name mt-3">Karen Gillan</div>
                                                    <div class="action-type fs-8 text-main">Diễn viên chính</div>
                                                </div>
                                                <div class="col-2 text-center ">
                                                    <div class="action-img rounded-circle ">
                                                        <img src="./src/assets/img/actor4.jpg" class="rounded-circle " alt="">
                                                    </div>
                                                    <div class="action-name mt-3">Sea Gunn</div>
                                                    <div class="action-type fs-8 text-main">Diễn viên chính</div>
                                                </div>
                                                <div class="col-2 text-center ">
                                                    <div class="action-img rounded-circle ">
                                                        <img src="./src/assets/img/actor5.jpg" class="rounded-circle " alt="">
                                                    </div>
                                                    <div class="action-name mt-3">Vin Diesel</div>
                                                    <div class="action-type fs-8 text-main">Diễn viên chính</div>
                                                </div>
                                            </div>
                                            <div class="player-content-btn d-flex my-4">
                                                <div class="content-btn fs-6">
                                                    <i class="fa-solid fa-down-long"></i> Tải xuống
                                                </div>
                                                <div class="content-btn fs-6">
                                                    <i class="fa-solid fa-bookmark"></i> Thêm vào lưu trữ
                                                </div>
                                                <div class="content-btn fs-6">
                                                    <i class="fa-solid fa-share-from-square"></i> Chia sẻ
                                                </div>
                                            </div>
                                        </div>
                    
                                    </div>
                                </div>
                                <div class="player-content col-3 my-4">
                                    <div class="player-content-rank fs-8">
                                        <h3 class="text-center">Bảng xếp hạng</h3>
                                        <ul class="list-unstyled ">
                                            ${html}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        `;
                        }

                        function convertToSlug(str) {
                            let nonAccentStr = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                            return nonAccentStr.toLowerCase().replace(/ /g, '-');
                        }
                        const carouselItemsLists = document.querySelectorAll('#showDetail')
                        const ShowModalBtn = document.querySelector('#showModal');
                        const element = document.createElement('div');
                        const modalDetailContainer = document.querySelector('#modal-detail .modal-dialog .modal-body');
                        const btnClose = document.querySelector('button#btn-close');
                        btnClose.onclick = () => {
                            modalDetailContainer.removeChild(element);
                        };
                        carouselItemsLists.forEach((item, index) => {
                            item.onclick = () => {
                                const id = item.getAttribute('data-idb');;
                                ShowModalBtn.click();
                                console.log(id);
                                element.innerHTML = moviesDetail(datas, id);
                                modalDetailContainer.append(element);
                                element.querySelector('#click-close').onclick = () => {
                                    modalDetailContainer.removeChild(element);
                                }
                            }
                        });
                    }, 100)
                })
            })
        }
    }).when('/admin/movies', {
        templateUrl: './src/app/views/admin/movies/movies.html',
        controller: movieController
    }).when('/admin/movie/create', {
        templateUrl: './src/app/views/admin/movies/create.html',
        controller: movieController
    }).when('/admin/movie/edit/:id', {
        templateUrl: './src/app/views/admin/movies/edit.html',
        controller: movieController
    }).when('/admin/account', {
        templateUrl: './src/app/views/admin/account/account.html',
        controller: accountController
    }).when('/admin/account/create', {
        templateUrl: './src/app/views/admin/account/create.html',
        controller: accountController
    }).when('/admin/account/edit/:id', {
        templateUrl: './src/app/views/admin/account/edit.html',
        controller: accountController
    }).otherwise({
        templateUrl: './src/app/views/component/404.html',
    })
}]);

// tạo component
angular.module('film-fpt').component('headerComponent', {
    templateUrl: './src/app/views/component/header.html',
    controller: function ($scope, $location) {
        if (localStorage.getItem('account') != null) {
            $scope.account = JSON.parse(localStorage.getItem('account'));
        }
        $scope.$on('checkAccount', function () {
            $scope.account = JSON.parse(localStorage.getItem('account'));
        });

        $scope.isShow = true;
        $scope.$on('$locationChangeStart', function () {
            if ($location.path().includes('/dang-ki') || $location.path().includes('/dang-nhap')) $scope.isShow = false;
            else $scope.isShow = true;
        });
    }
});
angular.module('film-fpt').component('footerComponent', {
    templateUrl: './src/app/views/component/footer.html',
    controller: function ($scope, $location) {
        $scope.isShow = true;
        $scope.$on('$locationChangeStart', function () {
            if ($location.path().includes('/dang-ki') || $location.path().includes('/dang-nhap')) $scope.isShow = false;
            else $scope.isShow = true;
        });
    }
});
angular.module('film-fpt').component('modalDetailComponent', {
    templateUrl: './src/app/views/component/modalDetail.html',
});
angular.module('film-fpt').component('toastComponent', {
    templateUrl: './src/app/views/component/toast.html',
    controller: function ($scope, $timeout) {
        $scope.$on('showToast', function (event, data) {
            $scope.toast = data;
            document.querySelector('#liveToast').classList.add('show');
            $timeout(() => {
                document.querySelector('#liveToast').classList.remove('show');
                $scope.toast = null;
            }, 3000);
        });
    }
});