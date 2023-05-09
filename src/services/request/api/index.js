import httpFormData from "../httpFormData";
import httpAdmin from "../httpAdmin";

export const apiGetMovies = async () => {
  const { data } = await httpAdmin.get("/QuanLyPhim/LayDanhSachPhim", {
    params: {
      maNhom: "GP11",
    },
  });

  return data;
};

export const apiGetCinemaSystem = async () => {
  const { data } = await httpAdmin.get("/QuanLyRap/LayThongTinHeThongRap");

  return data;
};

export const apiGetCinemaClusterInformation = async (code) => {
  const { data } = await httpAdmin.get(
    "/QuanLyRap/LayThongTinCumRapTheoHeThong",
    {
      params: {
        maHeThongRap: code,
      },
    }
  );

  return data;
};

export const apiGetShowtime = async (movieId) => {
  const { data } = await httpAdmin.get("/QuanLyRap/LayThongTinLichChieuPhim", {
    params: {
      MaPhim: movieId,
    },
  });

  return data;
};

export const apiSignIn = async (params) => {
  const { data } = await httpAdmin.post("/QuanLyNguoiDung/DangNhap", params);

  return data;
};

export const apiGetListUser = async (params) => {
  const { data } = await httpAdmin.get(
    "/QuanLyNguoiDung/LayDanhSachNguoiDung",
    {
      params: {
        MaNhom: "GP00",
        tuKhoa: params,
      },
    }
  );

  return data;
};

export const apiGetAdmin = async () => {
  const { data } = await httpAdmin.post("/QuanLyNguoiDung/ThongTinTaiKhoan");

  return data;
};

export const apiUpdateUserAdmin = async (params) => {
  const { data } = await httpAdmin.post(
    "/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
    {
      ...params,
      maNhom: "GP00",
    }
  );

  return data;
};

export const apiDeleteUserAdmin = async (account) => {
  const { data } = await httpAdmin.delete("/QuanLyNguoiDung/XoaNguoiDung", {
    params: {
      TaiKhoan: account,
    },
  });

  return data;
};

export const apiAddUser = async (params) => {
  const { data } = await httpAdmin.post("/QuanLyNguoiDung/ThemNguoiDung", {
    ...params,
    maNhom: "GP00",
  });

  return data;
};

export const apiAddMovie = async (params) => {
  const { data } = await httpFormData.post(
    "/QuanLyPhim/ThemPhimUploadHinh",
    params
  );

  return data;
};

export const apiUpdateMovie = async (params) => {
  const { data } = await httpFormData.post(
    "/QuanLyPhim/CapNhatPhimUpload",
    params
  );

  return data;
};

export const apiDeleteMovie = async (id) => {
  const { data } = await httpAdmin.delete("/QuanLyPhim/XoaPhim", {
    params: {
      MaPhim: id,
    },
  });

  return data;
};

export const apiCreateShowtimes = async (params) => {
  const { data } = await httpAdmin.post("/QuanLyDatVe/TaoLichChieu", params);

  return data;
};
