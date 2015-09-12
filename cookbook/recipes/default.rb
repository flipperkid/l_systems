#
# Cookbook Name:: celerity_cookbook
# Recipe:: default
#
# Copyright (C) 2015 YOUR_NAME
#
# All rights reserved - Do Not Redistribute
#
%w{curl vim git}.each do |pkg|
  package pkg do
    action :install
  end
end

include_recipe "nodejs"
include_recipe "nodejs::npm"
%w{gulp gulp-connect gulp-babel}.each do |pkg|
  nodejs_npm pkg
end

