import mainJs from "../../assets/js/main.js";
const API_URL = 'https://data-film-1.onrender.com/movieList';
const API_URL_ACCOUNT = 'https://data-film-1.onrender.com/account';
const LIMIT_ITEM = 12;


// hàm dùng chung
function convertToSlug(str) {
    let nonAccentStr = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return nonAccentStr.toLowerCase().replace(/ /g, '-');
}

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
        <div class="player-area d-xl-flex ">
            <div class="play-area-video col-12 col-xl-9">
                <iframe width="100%" height="600px" 
                    loading="lazy"
                    src="${movie.video}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen>
                </iframe>
            </div>
            <div class="play-area-episode col-xl-3 col-12 pt-1">
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
        <div class="player-content row d-block d-xl-flex">
            <div class="player-content-left col-12 col-xl-9 pe-3 fs-6 ">
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
                            <div class="col-md-2 col-4 text-center ">
                                <div class="action-img rounded-circle ">
                                    <img src="./src/assets/img/director.jpg" class="rounded-circle " alt="">
                                </div>
                                <div class="action-name mt-3">James Gunn</div>
                                <div class="action-type fs-8 text-main">Đạo diễn</div>
                            </div>

                            <div class="col-md-2 col-4 text-center ">
                                <div class="action-img rounded-circle ">
                                    <img src="./src/assets/img/actor1.jpg" class="rounded-circle " alt="">
                                </div>
                                <div class="action-name mt-3">Christ Pratt</div>
                                <div class="action-type fs-8 text-main">Diễn viên chính</div>
                            </div>
                            <div class="col-md-2 col-4 text-center ">
                                <div class="action-img rounded-circle ">
                                    <img src="./src/assets/img/actor2.jpg" class="rounded-circle " alt="">
                                </div>
                                <div class="action-name mt-3">Zoe Salada</div>
                                <div class="action-type fs-8 text-main">Diễn viên chính</div>
                            </div>
                            <div class="col-md-2 col-4 text-center ">
                                <div class="action-img rounded-circle ">
                                    <img src="./src/assets/img/actor3.jpg" class="rounded-circle " alt="">
                                </div>
                                <div class="action-name mt-3">Karen Gillan</div>
                                <div class="action-type fs-8 text-main">Diễn viên chính</div>
                            </div>
                            <div class="col-md-2 col-4 text-center ">
                                <div class="action-img rounded-circle ">
                                    <img src="./src/assets/img/actor4.jpg" class="rounded-circle " alt="">
                                </div>
                                <div class="action-name mt-3">Sea Gunn</div>
                                <div class="action-type fs-8 text-main">Diễn viên chính</div>
                            </div>
                            <div class="col-md-2 col-4 text-center ">
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
            <div class="player-content col-12 col-xl-3 my-4">
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
// các controller
function HomeController($scope, $http, $timeout, $rootScope) {
    $http.get(API_URL).then(($res, $req) => {
        var data = $res.data;
        mainJs();
        const videoBanner = document.querySelector('#banner-video');
        const btnPlay = document.querySelector('#btn-play');
        const btnControl = document.querySelector('.billboard_content_control_btn');

        function playVideo() {
            videoBanner.style.display = 'block';
            if (!videoBanner.paused) {
                videoBanner.pause();
                videoBanner.currentTime = 0;
            }
            videoBanner.play();
            videoBanner.muted = true;
        }
        btnPlay.addEventListener('click', () => {
            playVideo();
        });

        videoBanner.addEventListener('ended', () => {
            videoBanner.style.display = 'none';
            document.querySelector('.billboard_content_control_btn .fa-rotate-right').classList.add('active');
            document.querySelector('.billboard_content_control_btn .fa-volume-xmark').classList.remove('active');
            document.querySelector('.billboard_content_control_btn .fa-volume-high').classList.remove('active');
        })
        btnControl.addEventListener('click', () => {
            if (document.querySelector('.billboard_content_control_btn .fa-volume-xmark').classList.contains('active')) {
                videoBanner.muted = false;
                document.querySelector('.billboard_content_control_btn .fa-volume-xmark').classList.remove('active');
                document.querySelector('.billboard_content_control_btn .fa-volume-high').classList.add('active');
            } else if (document.querySelector('.billboard_content_control_btn .fa-volume-high').classList.contains('active')) {
                videoBanner.muted = true;
                document.querySelector('.billboard_content_control_btn .fa-volume-high').classList.remove('active');
                document.querySelector('.billboard_content_control_btn .fa-volume-xmark').classList.add('active');
            } else if (document.querySelector('.billboard_content_control_btn .fa-rotate-right').classList.contains('active')) {
                videoBanner.currentTime = 0
                playVideo();
                document.querySelector('.billboard_content_control_btn .fa-rotate-right').classList.remove('active');
                document.querySelector('.billboard_content_control_btn .fa-volume-high').classList.remove('active');
                document.querySelector('.billboard_content_control_btn .fa-volume-xmark').classList.add('active');
            }
        });
        // modal-vip
        let activeModal = document.querySelector('.modal_package.active');
        const modal_items = document.querySelectorAll('.modal_package');

        modal_items.forEach((item) => {
            item.addEventListener('click', () => {
                if (activeModal !== null) {
                    activeModal.classList.remove('active');
                }
                activeModal = item;
                activeModal.classList.add('active');
            });
        });
        $scope.movieLists = [{
                title: "Đề xuất hot",
                movies: getMovieList(data, ["Siêu anh hùng", "Hành động", "Phép thuật", "Tình yêu"])
            },
            {
                title: "Phim thuyết minh & lồng tiếng",
                movies: getMovieList(data, ["Kinh dị", "Hoạt hình", "Tình yêu"])
            },
            {
                title: "Tuyệt tác đang hot",
                movies: getMovieList(data, ["Kinh dị", "Hành động", "Tình yêu"], 12)
            },
            {
                title: "Dành riêng cho VIP",
                movies: getMovieList(data, ["Hành động", "Tình yêu"])
            },
            {
                title: "Tuyệt tác đang hot",
                movies: getMovieList(data, ["Kinh dị", "Hành động", "Tình yêu"])
            },
            {
                title: "Hoạt hình chọn lọc",
                movies: getMovieList(data, ["Hoạt hình"])
            },
            {
                title: "Phim chọn lọc",
                movies: getMovieList(data, ["Kinh dị", "Hành động", "Tình yêu"])
            },
            {
                title: "Phim Marvel",
                movies: getMovieList(data, ["Siêu anh hùng", "Tình yêu"])
            },
            {
                title: "Phim bộ ngôn tình",
                movies: getMovieList(data, ["Tình yêu"])
            }
        ];

        $scope.addBookmark = (event, movieId) => {
            event.stopPropagation();
            if (localStorage.getItem('account')) {
                const account = JSON.parse(localStorage.getItem('account'));
                $http.get(`${API_URL}/${movieId}`).then(($res) => {
                    const newData = {
                        idMovie: $res.data,
                        idAccount: account
                    }
                    $http.post('https://data-film-1.onrender.com/bookmark', newData).then(($res) => {
                        if ($res.status == 201) {
                            alert('Thêm vào xem sau thành công');
                        } else {
                            const messeage = {
                                title: 'Thông báo',
                                message: 'Bộ phim đã có trong xem sau'
                            };
                            $rootScope.$broadcast('showToast', messeage);
                        }
                    });
                })
            } else {
                const messeage = {
                    title: 'Thông báo',
                    message: 'Bạn phải đăng nhập để sử dụng chức năng này'
                };
                $rootScope.$broadcast('showToast', messeage);
            }
        }
        // $timeout
        $timeout(() => {
            const prevBtns = document.querySelectorAll('.carousel_btn-prev');
            const nextBtns = document.querySelectorAll('.carousel_btn-next');
            const carouselMove = document.querySelector('.carousel-move');
            const carouselMoves = document.querySelectorAll('.carousel-move');
            const carouselItemsLists = document.querySelectorAll('.carousel_item');
            // Lặp qua mỗi slide
            $scope.movieLists.forEach((slide, index) => {
                const item = slide.movies;
                const prevBtn = prevBtns[index];
                const nextBtn = nextBtns[index];
                const carouselItems = carouselMoves[index].querySelectorAll('.carousel_item');
                const carouselMoveQuantity = Math.round(carouselItems.length / (carouselMove.offsetWidth / carouselItemsLists[0].offsetWidth));
                prevBtn.style.display = 'none';
                let l = 0;

                nextBtn.onclick = () => {
                    prevBtn.style.display = 'block';
                    l++;
                    if (l < carouselMoveQuantity) {

                        carouselMoves[index].style.transform = `translateX(calc(0px - ${carouselMove.offsetWidth}px * ${l}))`;
                        if (l == carouselMoveQuantity - 1) {
                            nextBtn.style.display = 'none';
                        }
                    } else {
                        l = carouselMoveQuantity - 1;
                        nextBtn.style.display = 'none';
                    }
                }

                prevBtn.onclick = () => {
                    nextBtn.style.display = 'block';
                    l--;
                    if (l >= 0) {
                        carouselMoves[index].style.transform = `translateX(calc(0px - ${carouselMove.offsetWidth}px * ${l}))`;
                        if (l == 0) {
                            prevBtn.style.display = 'none';
                        }
                    } else {
                        l = 0
                        prevBtn.style.display = 'none';
                    }
                }

                if (carouselMoves[index].classList.contains('standard')) {
                    for (let i = 1; i < carouselItems.length; i++) {
                        if ((i + 1) % 6 == 0) {
                            carouselItems[i].onmouseover = function () {
                                carouselItems[i].style.transform = `translateX(-${carouselItems[i].offsetWidth / 2}px)`;
                                carouselItems[i - 1].style.opacity = '0';
                            }
                            carouselItems[i].onmouseout = function () {
                                carouselItems[i].style.transform = 'translateX(0)';
                                carouselItems[i - 1].style.opacity = '1';
                            }
                        }
                    }
                }

            });
            const ShowModalBtn = document.querySelector('#showModal');
            const element = document.createElement('div');
            const modalDetailContainer = document.querySelector('#modal-detail .modal-dialog .modal-body');
            const btnClose = document.querySelector('button#btn-close');
            btnClose.onclick = () => {
                modalDetailContainer.removeChild(element);
            };
            carouselItemsLists.forEach((item, index) => {
                item.onclick = () => {
                    const id = item.getAttribute('data-id');;
                    ShowModalBtn.click();
                    element.innerHTML = moviesDetail(data, id);
                    modalDetailContainer.append(element);
                    element.querySelector('#click-close').onclick = () => {
                        modalDetailContainer.removeChild(element);
                    }
                }
            });

        }, 100);
    })
}

function DetailController($scope, $http, $routeParams, $timeout, $rootScope) {
    mainJs();
    $http.get(`${API_URL}/${$routeParams.id}`).then(($res, $req) => {
        const data = $res.data;
        $scope.movieDetail = data
        const iframe = document.querySelector('iframe');
        iframe.src = data.video + '?autoplay=1';
        $http.get(API_URL).then(($res) => {
            $scope.movieRelated = getMovieList($res.data, data.category);
            $timeout(() => {
                const btnPrev = document.querySelector('.carousel_btn-prev');
                const btnNext = document.querySelector('.carousel_btn-next');
                const itemMovies = document.querySelectorAll('.carousel_item');
                const carouselMove = document.querySelector('.carousel-move');
                const quantity = Math.round(carouselMove.offsetWidth / itemMovies[0].offsetWidth);
                let l = 0;

                btnPrev.style.display = 'none';

                function autoSlide() {
                    if (itemMovies.length < 6) {
                        return false;
                    }
                    btnPrev.style.display = 'block';
                    l++;
                    carouselMove.style.transform = `translateX(calc(0px - (${itemMovies[0].offsetWidth}px * ${l})))`;
                    if (l + quantity == itemMovies.length + 1) {
                        l = 0;
                        carouselMove.style.transform = `translateX(0px)`;
                        btnPrev.style.display = 'none';
                    }
                }
                let slide = setInterval(() => {
                    autoSlide();
                }, 2000);
                btnNext.onclick = () => {
                    autoSlide();
                    clearInterval(slide);
                };
                btnPrev.onclick = () => {
                    clearInterval(slide);
                    l--;
                    if (l >= 0) {
                        carouselMove.style.transform = `translateX(calc(0px - (${itemMovies[0].offsetWidth}px * ${l}))`;
                        if (l == 0) {
                            btnPrev.style.display = 'none';
                        }
                    } else {
                        l = 0;
                        btnPrev.style.display = 'none';
                    }
                }
                itemMovies.forEach((item) => {
                    item.onclick = () => {
                        const id = item.getAttribute('data-id');
                        window.location.href = `#!/detail/${convertToSlug(data.name)}?id=${id}`;
                    }
                })
            }, 1000)
        })
    });
    $http.get('https://data-film-1.onrender.com/comments').then(($res) => {
        $scope.comments = $res.data.filter((item) => item.movieId == $routeParams.id);
    });
    $scope.onComment = () => {
        const account = JSON.parse(localStorage.getItem('account'));
        if (account) {
            const comment = document.querySelector('#comment').value;
            if (comment) {
                const newComment = {
                    user: {
                        ...account
                    },
                    comment: comment,
                    movieId: $routeParams.id,
                    time: new Date(
                        new Date().getFullYear(),
                        new Date().getMonth(),
                        new Date().getDate()
                    ),
                }
                $http.post('https://data-film-1.onrender.com/comments', newComment).then(($res) => {
                    if ($res.status === 201) {
                        
                    }
                });
            } else {
                const messeage = {
                    title: 'Thông báo',
                    message: 'Bạn chưa nhập bình luận'
                };
                $rootScope.$broadcast('showToast', messeage);
            }
        } else {
            const messeage = {
                title: 'Thông báo',
                message: 'Bạn phải đăng nhập để sử dụng chức năng này'
            };
            $rootScope.$broadcast('showToast', messeage);
        }

    }

}

function SeriesController($scope, $http, $routeParams) {
    mainJs();
    $scope.convertToSlug = convertToSlug;

    function test(page) {
        $http.get(`${API_URL}?_limit=${LIMIT_ITEM}&_page=${page}`).then(($res, $req) => {
            $scope.movieLists = $res.data;
        });
    }
    $http.get(API_URL).then(($res) => {
        $scope.totalMovies = $res.data.length;
        $scope.totalPage = Math.ceil($scope.totalMovies / LIMIT_ITEM);
        $scope.pages = Array.from({
            length: $scope.totalPage
        }, (_, index) => index + 1);
        test($routeParams.page);
    });
}

function ContactController() {
    mainJs();
}

function FeedBackController() {
    mainJs();
}

function FaqController() {
    mainJs();
}

function LoginController($http, $scope, $location, $rootScope) {
    mainJs();

    $scope.onSubmit = function () {
        let valid = true;
        if (!$scope.acc || !$scope.acc.username) {
            valid = false;
        }
        if (!$scope.acc || !$scope.acc.password) {
            valid = false;
        }
        if (valid) {
            $http.get(`${API_URL_ACCOUNT}?userName=${$scope.acc.username}&password=${$scope.acc.password}`).then(($res) => {
                if ($res.data.length > 0) {
                    localStorage.setItem('account', JSON.stringify($res.data[0]));
                    alert('Đăng nhập thành công');
                    $rootScope.$broadcast('checkAccount');
                    $location.path('/');
                } else {
                    alert('Tài khoản hoặc mật khẩu không đúng');
                }
            });
        } else {
            alert('Dữ liệu không hợp lệ');
        }


    }
}

function RegisterController($scope, $http, $location) {
    mainJs();
    $scope.active = false;
    $scope.onSubmit = function () {
        let valid = true;
        if (!$scope.acc || !$scope.acc.userName) {
            valid = false;
        }
        if (!$scope.acc || !$scope.acc.password) {
            valid = false;
        }
        if (valid) {
            var newAcc = {
                ...$scope.acc,
            }
            $http.get(`${API_URL_ACCOUNT}?userName=${$scope.acc.userName}`).then(($res) => {
                if ($res.data.length > 0) {
                    alert('Tài khoản đã tồn tại');
                    return false;
                }
                $http.post(API_URL_ACCOUNT, newAcc).then(($res) => {
                    if ($res.status === 201) {
                        alert('Đăng kí thành công')
                        $location.path('/dang-nhap');
                    }
                }, function (errors) {
                    console.log(errors);
                });
            });
        } else {
            alert('Dữ liệu không hợp lệ');
        }


    }
}


export {
    HomeController,
    DetailController,
    SeriesController,
    ContactController,
    FeedBackController,
    FaqController,
    LoginController,
    RegisterController
};