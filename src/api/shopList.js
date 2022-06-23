import http from "@/libs/axios";



export function getShopList(query) {
  return http({
    url: "/",
    method: "get",
    params: query
  })
}

export function createShopList(data) {
  return http({
    url: "/",
    method: "post",
    data
  })
}

export function editShopList(data) {
  return http({
    url: "/",
    method: "patch",
    data
  })
}

export function deleteShopList(query) {
  return http({
    url: "/",
    method: "delete",
    params: query,
  })
}